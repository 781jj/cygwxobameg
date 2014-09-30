//
//  VSGameBroadcast.m
//  GameBox
//
//  Created by YaoMing on 14-9-30.
//  Copyright (c) 2014年 cyggame. All rights reserved.
//

#import "VSGameBroadcast.h"


static VSGameBroadcast *_broadcast = nil;
@implementation VSGameBroadcast
+ (VSGameBroadcast *)shareInstance
{
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        if (nil == _broadcast) {
            _broadcast = [[VSGameBroadcast alloc] init];
            
        }
    });
    return _broadcast;
}
@end
