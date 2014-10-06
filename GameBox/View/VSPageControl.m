//
// Created by William Zhao on 2/17/14.
// Copyright (c) 2014 Vipshop Holdings Limited. All rights reserved.
//

#import "VSPageControl.h"

@interface VSPageControl ()

@property (nonatomic , retain)UIImage *normalDotImage;
@property (nonatomic , retain)UIImage *highlightedDotImage;
@property (nonatomic , strong)NSMutableArray *dotsArray;
@property (nonatomic , assign)float dotsSize;
@property (nonatomic , assign)NSInteger dotsGap;
@property (nonatomic , retain) UIImageView *highlightedDotImageView;

- (void)dotsDidTouched:(UIView *)sender;

@end

@implementation VSPageControl




/*
 *pageNum是pageControl的页面总个数
 *size是单个dot的边长
 */
- (id)initWithFrame:(CGRect)frame
        normalImage:(UIImage *)nImage
   highlightedImage:(UIImage *)hImage
         dotsNumber:(NSInteger)pageNum
         sideLength:(NSInteger)size
            dotsGap:(NSInteger)gap
{
    if ((self = [super initWithFrame:frame])) {
        self.userInteractionEnabled = YES;
        self.dotsGap = gap;
        self.dotsSize = size;
        self.dotsArray = [NSMutableArray array];
        self.normalDotImage = nImage;
        self.highlightedDotImage = hImage;
        self.pageNumbers = pageNum;

        UIImageView *dotImageView_h = [[UIImageView alloc] initWithImage:_highlightedDotImage];
        [dotImageView_h.layer setMasksToBounds:NO];
        dotImageView_h.frame = CGRectMake(0, 0, self.dotsSize, self.dotsSize);
        self.highlightedDotImageView = dotImageView_h;

        for (int i = 0; i != _pageNumbers; ++ i) {
            UIImageView *dotsImageView = [[UIImageView alloc] init];
            dotsImageView.userInteractionEnabled = YES;
            dotsImageView.frame = CGRectMake((size + gap) * i, 0, size, size);
            dotsImageView.tag = 100 + i;
            if (i == 0) {
                self.highlightedDotImageView.frame = CGRectMake((size + gap) * i, 0, size, size);
            }

            dotsImageView.image = _normalDotImage;
            [dotsImageView.layer setMasksToBounds:NO];

            UITapGestureRecognizer *gestureRecognizer = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(dotsDidTouched:)];
            [dotsImageView addGestureRecognizer:gestureRecognizer];
            [self addSubview:dotsImageView];
        }
        [self addSubview:_highlightedDotImageView];
    }
    return self;
}

- (void)dotsDidTouched:(id)sender {
    if (_delegate && [_delegate respondsToSelector:@selector(pageControlDidStopAtIndex:)]) {
        [_delegate pageControlDidStopAtIndex:[[sender view] tag] - 100];
    }
}

- (void)setCurrentPage:(NSInteger)pages {
    if (_normalDotImage || _highlightedDotImage) {
        CGRect newRect = CGRectMake((self.dotsSize + self.dotsGap) * pages, 0, self.dotsSize, self.dotsSize);

        self.highlightedDotImageView.frame = newRect;
    }
}


@end