//
//  VSGameText.h
//  GameBox
//
//  Created by YaoMing on 14-9-30.
//  Copyright (c) 2014年 cyggame. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface VSGameText : NSObject
+ (VSGameText *)shareInstance;

- (NSString *)gameName:(NSString *)gameId;
- (NSString *)gameAbstract:(NSString *)gameId;
- (NSString *)gameShare:(NSString *)gameId;

@end
