//
//  VSHomeController.h
//  GameBox
//
//  Created by YaoMing on 14-10-5.
//  Copyright (c) 2014年 cyggame. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface VSHomeController : NSObject
+ (VSHomeController *)shareInstance;
- (void)gamePlayClick:(id)sender;
- (void)galleryClick:(id)sender;
//- (void)channelClick:(id)sender;
- (void)gameClick:(id)sender;
- (void)pkClick:(id)sender;

- (void)share;

- (void)gamePlay:(NSInteger )index;

@end
