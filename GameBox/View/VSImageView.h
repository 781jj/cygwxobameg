//
//  VSImageView.h
//  GameBox
//
//  Created by YaoMing on 14-10-8.
//  Copyright (c) 2014年 cyggame. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface VSImageView : UIImageView

- (void)reloadImage:(NSString *)urlPath default:(NSString *)path;

- (void)reloadImage:(NSString *)urlPath;
@end
