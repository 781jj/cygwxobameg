//
//  VSPageView.m
//  GameBox
//
//  Created by YaoMing on 14-10-5.
//  Copyright (c) 2014年 cyggame. All rights reserved.
//

#import "VSPageView.h"
#import "VSHomeController.h"
@implementation VSPageView

/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
}
*/

- (id) initWithFrame:(CGRect)frame imagePath:(NSString *)path;
{
    self = [super initWithFrame:frame];
    if (self) {
        self.backgroundColor = [UIColor colorWithWhite:1.0 alpha:0.15];
        
        UIButton *button = [UIButton buttonWithType:UIButtonTypeCustom];
        button.frame = CGRectMake(frame.size.width*0.05, 0, frame.size.width*0.9, frame.size.height);
        [button setImage:[UIImage imageWithContentsOfFile:path] forState:UIControlStateNormal];
        [button addTarget:[VSHomeController shareInstance] action:@selector(galleryClick:) forControlEvents:UIControlEventTouchUpInside];
        button.tag = _index+1;
        [self addSubview:button];
    }
    return self;
}

@end
