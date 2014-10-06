//
//  VSPageView.h
//  GameBox
//
//  Created by YaoMing on 14-10-5.
//  Copyright (c) 2014年 cyggame. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface VSPageView : UIView

@property (nonatomic,assign)NSInteger index;
- (id) initWithFrame:(CGRect)frame imagePath:(NSString *)path;
@end
