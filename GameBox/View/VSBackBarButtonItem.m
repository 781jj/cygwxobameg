//
//  VSBackBarButtonItem.m
//  Components
//
//  Created by William Zhao on 13-10-18.
//  Copyright (c) 2013年 Vipshop Holdings Limited. All rights reserved.
//

#import "VSBackBarButtonItem.h"

@interface VSBackBarButtonItem ()

@property(nonatomic, retain) UIButton *buttonView;

@end

@implementation VSBackBarButtonItem


+ (id)backBarButtonItem:(id)target selector:(SEL)selector {
    UIButton *leftButton = [UIButton buttonWithType:UIButtonTypeCustom];
    leftButton.exclusiveTouch = YES;
    UIImage *leftButtonImage = [UIImage imageNamed:@"btn_back"];
    leftButton.frame = CGRectMake(0, 0, leftButtonImage.size.width, leftButtonImage.size.height);
    [leftButton setImage:leftButtonImage forState:UIControlStateNormal];
    return [[VSBackBarButtonItem alloc] initWithButtonView:leftButton target:target selector:selector] ;
}



- (id)initWithButtonView:(UIButton *)buttonView target:(id)target selector:(SEL)selector {
    self = [super initWithCustomView:buttonView];
    if (self) {
        self.buttonView = buttonView;
        CGRect frame = self.buttonView.frame;
        frame.origin.x = frame.origin.x - 2;
        self.buttonView.frame =frame;
        self.buttonView.exclusiveTouch = YES;
        [_buttonView addTarget:target action:selector forControlEvents:UIControlEventTouchUpInside];
        
    }
    return self;
}

- (id)initWithButtonView:(UIButton *)buttonView {
    self = [super initWithCustomView:buttonView];
    if (self) {
        self.buttonView = buttonView;
        self.buttonView.exclusiveTouch = YES;
    }
    return self;
}







@end