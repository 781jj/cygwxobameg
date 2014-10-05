//
// Created by William Zhao on 2/17/14.
// Copyright (c) 2014 Vipshop Holdings Limited. All rights reserved.
//

#import <UIKit/UIKit.h>

@protocol VSPageControlDelegate <NSObject>

@optional
- (void)pageControlDidStopAtIndex:(NSInteger)index;

@end

@interface VSPageControl : UIView {
    UIImage         *_normalDotImage;
    UIImage         *_highlightedDotImage;
    NSInteger       __pageNumbers;
    float           __dotsSize;
    NSInteger       __dotsGap;
    
}

- (id)initWithFrame:(CGRect)frame
        normalImage:(UIImage *)nImage
   highlightedImage:(UIImage *)hImage
         dotsNumber:(NSInteger)pageNum
         sideLength:(NSInteger)size
            dotsGap:(NSInteger)gap;

- (void)setCurrentPage:(NSInteger)pages;

@property (nonatomic , assign) NSInteger pageNumbers;
@property (nonatomic , assign) IBOutlet id<VSPageControlDelegate> delegate;

@end