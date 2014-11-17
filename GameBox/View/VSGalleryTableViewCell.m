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
#import "CycleScrollView.h"
@interface VSGalleryTableViewCell()<UIScrollViewDelegate>


@property (nonatomic,strong)CycleScrollView *scrollview;
@property (nonatomic,strong)UILabel *nameLabel;
@property (nonatomic,strong)VSPageControl *pageControl;
@property (nonatomic)NSInteger pageIndex;
@end

@implementation VSGalleryTableViewCell
- (void)dealloc
{
    
}

- (id)initWithReuseId:(NSString *)reuseId
{
    self = [super initWithStyle:UITableViewCellStyleDefault reuseIdentifier:reuseId];
    if (self) {
         self.selectionStyle = UITableViewCellSelectionStyleNone;
        
       
        VSChannel *channel = [[VSChannelList shareInstance] currentChannel];
        if ([channel.gameList count]< 1 || ![[channel.gameList objectAtIndex:0] isKindOfClass:[VSFavorGame class]]) {
            return self;
        }
        
        VSFavorGame *info = [channel.gameList objectAtIndex:0];

        
       
        _scrollview = [[CycleScrollView alloc] initWithFrame:CGRectMake(0, 0, self.bounds.size.width, VSGalleryTableViewCellHeight) animationDuration:AutoScrollInterval];
        _scrollview.backgroundColor = [UIColor clearColor];
        [self addSubview:_scrollview];
        
        NSInteger count = [info.favorlist count];
        
        __weak VSGalleryTableViewCell *blockself = self;
        _scrollview.fetchContentViewAtIndex = ^UIView *(NSInteger pageIndex){
            VSGameDetailInfo *gameInfo = [info.favorlist  objectAtIndex:pageIndex];
            VSPageView *page = [[VSPageView alloc ] initWithFrame:CGRectMake(pageIndex*blockself.scrollview.frame.size.width, 0, blockself.scrollview.frame.size.width, blockself.scrollview.frame.size.height) imagePath:gameInfo.bigPic];
            page.index = pageIndex;
            return page;
        };
        _scrollview.totalPagesCount = ^NSInteger(void){
            return count;
        };

        _scrollview.scrollActionBlock  =  ^(NSInteger index){
            VSChannel *channel = [[VSChannelList shareInstance] currentChannel];
            if ([channel.gameList count]< 1 || ![[channel.gameList objectAtIndex:0] isKindOfClass:[VSFavorGame class]]) {
                return;
            }
            NSInteger count = index;
            VSFavorGame *favor = [channel.gameList objectAtIndex:0];
            if (blockself.pageIndex != count && count < [favor.favorlist count] ) {
                blockself.pageIndex = count;
                [blockself.pageControl setCurrentPage:blockself.pageIndex];
                
                
                VSGameDetailInfo *info = [favor.favorlist objectAtIndex:count];
                blockself.nameLabel.text = info.name;
            }
        };
        

        UIView *introduceView = [[UIView alloc ]initWithFrame:CGRectMake(0,_scrollview.frame.size.height*0.85, _scrollview.frame.size.width,_scrollview.frame.size.height*0.15)];
        introduceView.backgroundColor = [UIColor colorWithWhite:0.1 alpha:0.16];
        [self addSubview:introduceView];
        
        
      
        UILabel *label = [[UILabel alloc] initWithFrame:CGRectMake(introduceView.frame.size.width*0.05, 0, introduceView.frame.size.width*0.6, introduceView.frame.size.height)];
        label.backgroundColor = [UIColor clearColor];
        if ([info.favorlist count]>0) {
            VSGameDetailInfo *gameInfo = [info.favorlist objectAtIndex:0];
            label.text = gameInfo.name;
            _pageIndex = 0;
        }
        label.textColor = [UIColor whiteColor];
        label.textAlignment = 0;
        label.font = [UIFont boldSystemFontOfSize:14];
        [introduceView addSubview:label];
        _nameLabel = label;
        
  
        
        
        NSInteger totalPageCounts = [info.favorlist count];
        CGFloat dotGapWidth = 5.0;
        CGFloat sizeHiehgt = 8.0;
        
        UIImage *normalDotImage = [UIImage imageNamed:@"dot_banner_white"];
        CGFloat pageControlWidth = totalPageCounts * normalDotImage.size.width + (totalPageCounts - 1) * dotGapWidth;
        CGFloat pageControlX = CGRectGetWidth(_scrollview.frame)*0.95-pageControlWidth;
        CGRect pageControlFrame = CGRectMake(pageControlX,
                                             5,
                                             pageControlWidth,
                                             normalDotImage.size.height);
        
        _pageControl = [[VSPageControl alloc] initWithFrame:pageControlFrame
                                                normalImage:normalDotImage
                                           highlightedImage:[UIImage imageNamed:@"dot_banner_red"]
                                                 dotsNumber:totalPageCounts sideLength:(NSInteger) sizeHiehgt dotsGap:(NSInteger) dotGapWidth];
        _pageControl.hidden = NO;
        [introduceView addSubview:_pageControl];
    }
    return self;
}





@end
