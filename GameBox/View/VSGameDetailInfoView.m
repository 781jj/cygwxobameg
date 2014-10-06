//
//  VSGameDetailInfoView.m
//  GameBox
//
//  Created by YaoMing on 14-10-6.
//  Copyright (c) 2014年 cyggame. All rights reserved.
//

#import "VSGameDetailInfoView.h"
#import "VSGameDetailInfo.h"
#import "VSDetailGalleryView.h"
#import "VSRankingView.h"
@interface VSGameDetailInfoView ()
{
    BOOL _isRandking;
}
@property (nonatomic,weak)IBOutlet UIButton *right;
@property (nonatomic,weak)IBOutlet UIButton *left;
@property (nonatomic,weak)IBOutlet UIScrollView *scrollView;
@property (nonatomic,strong)VSDetailGalleryView *galleryView;
@property (nonatomic,strong)VSRankingView *rankView;
@end
@implementation VSGameDetailInfoView


- (id)initWithCoder:(NSCoder *)aDecoder
{
    self = [super initWithCoder:aDecoder];
    if (self) {

        _isRandking = NO;
    }
    return self;
}

- (void)reloadData:(VSGameDetailInfo *)gameInfo
{
    [_scrollView setContentSize:CGSizeMake(_scrollView.frame.size.width*2.0, _scrollView.frame.size.height)];
    
    if (!_galleryView) {
        _galleryView = [[VSDetailGalleryView alloc] initWithFrame:_scrollView.bounds];
        [_scrollView addSubview:_galleryView];
    }
 
    
    if (!_rankView) {
        _rankView = [[VSRankingView alloc] initWithFrame:CGRectMake(_scrollView.frame.size.width, 0, _scrollView.frame.size.width, _scrollView.frame.size.height)];
        [_scrollView addSubview:_rankView];
    }

    [_galleryView reload:gameInfo.showImagesPath];
}



- (IBAction)rightBtnClick:(id)sender
{
    if (_isRandking) {
        return;
    }
    
    _isRandking = YES;
    [_right setTitleColor:UIColorFromRGB(0xf2cb2a) forState:UIControlStateNormal];
    [_left setTitleColor:UIColorFromRGB(0x868686) forState:UIControlStateNormal];
    [_scrollView setContentOffset:CGPointMake(_scrollView.frame.size.width, 0) animated:YES];
}


- (IBAction)leftBtnClick:(id)sender
{
    if (!_isRandking) {
        return;
    }
    
    _isRandking = NO;
    [_left setTitleColor:UIColorFromRGB(0xf2cb2a) forState:UIControlStateNormal];
    [_right setTitleColor:UIColorFromRGB(0x868686) forState:UIControlStateNormal];
    [_scrollView setContentOffset:CGPointMake(0, 0) animated:YES];
    
    [_rankView reload];
}
@end
