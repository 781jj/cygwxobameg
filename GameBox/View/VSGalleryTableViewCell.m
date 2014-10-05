///Users/yaoming/Documents/iosProject/cygwxobameg/GameBox/View/VSGalleryTableViewCell.m
//  VSGalleryTableViewCell.m
//  GameBox
//
//  Created by YaoMing on 14-10-5.
//  Copyright (c) 2014年 cyggame. All rights reserved.
//

#import "VSGalleryTableViewCell.h"
#import "VSFavorGame.h"
#import "VSGameDetailInfo.h"
#import "VSPageView.h"
#import "VSPageControl.h"
#import "VSChannelList.h"
#import "VSChannel.h"
@interface VSGalleryTableViewCell()<UIScrollViewDelegate>
{
    NSInteger _pageIndex;
}

@property (nonatomic,strong)UIScrollView *scrollview;
@property (nonatomic,strong)UILabel *nameLabel;
@property (nonatomic,strong)VSPageControl *pageControl;
@end

@implementation VSGalleryTableViewCell
- (void)dealloc
{
    _scrollview.delegate = nil;
}

- (id)initWithReuseId:(NSString *)reuseId
{
    self = [super initWithStyle:UITableViewCellStyleDefault reuseIdentifier:reuseId];
    if (self) {
        
        
        VSChannel *channel = [[VSChannelList shareInstance] currentChannel];
        if ([channel.gameList count]< 1 || ![[channel.gameList objectAtIndex:0] isKindOfClass:[VSFavorGame class]]) {
            return self;
        }
        
        VSFavorGame *info = [channel.gameList objectAtIndex:0];

        
        self.selectionStyle = UITableViewCellSelectionStyleNone;
        _scrollview = [[UIScrollView alloc] initWithFrame:CGRectMake(0, 0, self.bounds.size.width, VSGalleryTableViewCellHeight)];
        _scrollview.backgroundColor = [UIColor clearColor];
        _scrollview.showsHorizontalScrollIndicator = NO;
        _scrollview.showsVerticalScrollIndicator = NO;
        _scrollview.bounces = YES;
        _scrollview.pagingEnabled = YES;
        
        NSInteger count = [info.favorlist count];
        [_scrollview setContentSize:CGSizeMake(count*_scrollview.frame.size.width, _scrollview.frame.size.height)];
        
        
        for (NSInteger i = 0;i < count;i++) {
            VSGameDetailInfo *gameInfo = [info.favorlist  objectAtIndex:i];
            VSPageView *page = [[VSPageView alloc ] initWithFrame:CGRectMake(i*_scrollview.frame.size.width, 0, _scrollview.frame.size.width, _scrollview.frame.size.height) imagePath:gameInfo.iconPath];
            [_scrollview addSubview:page];
        }
        
        

        UIView *introduceView = [[UIView alloc ]initWithFrame:CGRectMake(0,self.bounds.size.height-15, self.bounds.size.width,15)];
        introduceView.backgroundColor = [UIColor colorWithWhite:0.1 alpha:0.16];
        [self addSubview:introduceView];
        
        
      
        UILabel *label = [[UILabel alloc] initWithFrame:CGRectMake(15, 5, 100, 20)];
        label.backgroundColor = [UIColor clearColor];
        if ([info.favorlist count]>0) {
            VSGameDetailInfo *gameInfo = [info.favorlist objectAtIndex:0];
            label.text = gameInfo.name;
            _pageIndex = 0;
        }
        label.textColor = [UIColor whiteColor];
        label.textAlignment = 0;
        label.font = [UIFont systemFontOfSize:15];
        [introduceView addSubview:label];
        _nameLabel = label;
        
  
        
        
        NSInteger totalPageCounts = [info.favorlist count];
        CGFloat dotGapWidth = 5.0;
        CGFloat sizeHiehgt = 5.0;
        
        UIImage *normalDotImage = [UIImage imageNamed:@"dot_banner_white"];
        CGFloat pageControlWidth = totalPageCounts * normalDotImage.size.width + (totalPageCounts - 1) * dotGapWidth;
        CGFloat pageControlX = CGRectGetWidth(_scrollview.frame)-pageControlWidth-7-11;
        CGRect pageControlFrame = CGRectMake(pageControlX,
                                             0.9 * CGRectGetHeight(_scrollview.frame),
                                             pageControlWidth,
                                             normalDotImage.size.height);
        
        _pageControl = [[VSPageControl alloc] initWithFrame:pageControlFrame
                                                normalImage:normalDotImage
                                           highlightedImage:[UIImage imageNamed:@"dot_banner_red"]
                                                 dotsNumber:totalPageCounts sideLength:(NSInteger) sizeHiehgt dotsGap:(NSInteger) dotGapWidth];
        _pageControl.hidden = NO;
    }
    return self;
}


- (void)update
{
    VSChannel *channel = [[VSChannelList shareInstance] currentChannel];
    if ([channel.gameList count]< 1 || ![[channel.gameList objectAtIndex:0] isKindOfClass:[VSFavorGame class]]) {
        return;
    }
    VSFavorGame *data = [channel.gameList objectAtIndex:0];

    if (_scrollview ) {
        for (UIView *view in _scrollview.subviews) {
            [view removeFromSuperview];
        }
    }
    
    NSInteger count = [data.favorlist count];
    [_scrollview setContentSize:CGSizeMake(count*_scrollview.frame.size.width, _scrollview.frame.size.height)];
    
    
    for (NSInteger i = 0;i < count;i++) {
        VSGameDetailInfo *gameInfo = [data.favorlist  objectAtIndex:i];
        VSPageView *page = [[VSPageView alloc ] initWithFrame:CGRectMake(i*_scrollview.frame.size.width, 0, _scrollview.frame.size.width, _scrollview.frame.size.height) imagePath:gameInfo.iconPath];
        [_scrollview addSubview:page];
    }
    
    
    if ([data.favorlist count]>0) {
        VSGameDetailInfo *gameInfo = [data.favorlist objectAtIndex:0];
        _nameLabel.text = gameInfo.name;
        _pageIndex = 0;
    }
    
    if (_pageControl) {
        [_pageControl setCurrentPage:0];
    }
}


- (void)scrollViewDidEndScrollingAnimation:(UIScrollView *)scrollView
{
    
    VSChannel *channel = [[VSChannelList shareInstance] currentChannel];
    if ([channel.gameList count]< 1 || ![[channel.gameList objectAtIndex:0] isKindOfClass:[VSFavorGame class]]) {
        return;
    }
    NSInteger count = scrollView.contentOffset.x/scrollView.frame.size.width;
    VSFavorGame *favor = [channel.gameList objectAtIndex:0];
    if (_pageIndex != count && count < [favor.favorlist count] ) {
        _pageIndex = count;
        [_pageControl setCurrentPage:_pageIndex];
        
        
        VSGameDetailInfo *info = [favor.favorlist objectAtIndex:count];
        _nameLabel.text = info.name;
    }
}
@end
