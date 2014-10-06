//
//  VSDetailGalleryView.m
//  GameBox
//
//  Created by YaoMing on 14-10-6.
//  Copyright (c) 2014年 cyggame. All rights reserved.
//

#import "VSDetailGalleryView.h"


@interface VSDetailGalleryView ()
@property(nonatomic,strong)UIScrollView *scrollView;
@end
@implementation VSDetailGalleryView


- (id)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        _scrollView = [[UIScrollView alloc] initWithFrame:self.bounds];
        _scrollView.backgroundColor = UIColorFromRGB(0xf0f2f5);
        _scrollView.showsHorizontalScrollIndicator = NO;
        _scrollView.showsVerticalScrollIndicator = NO;
        [self addSubview:_scrollView];
    }
    return self;
}

- (void)reload:(NSArray *)list
{
    NSInteger count = [list count];
    [_scrollView setContentSize:CGSizeMake(_scrollView.frame.size.width*count/2.0, _scrollView.frame.size.height)];
    for (NSInteger i = 0; i< count;i++) {
        float width = _scrollView.frame.size.width/2.0-6*1.5;
        float origin = 6+i*(width+6);
        UIImageView *image = [[UIImageView alloc] initWithFrame:CGRectMake(origin, 12, width, _scrollView.frame.size.height-24)];
        image.image = [UIImage imageWithContentsOfFile:[list objectAtIndex:i]];
        [_scrollView addSubview:image];
    }
}
@end
