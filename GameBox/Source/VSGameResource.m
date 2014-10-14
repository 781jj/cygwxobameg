//
//  VSGameResource.m
//  GameBox
//
//  Created by YaoMing on 14-10-14.
//  Copyright (c) 2014年 cyggame. All rights reserved.
//

#import "VSGameResource.h"
#import "VSGameImage.h"
#import "VSGameHtml.h"
#import "VSGameText.h"
static VSGameResource *_gameResource = nil;
@implementation VSGameResource
- (id)init
{
    self = [super init];
    if (self) {
        [VSGameHtml shareInstance];
        [VSGameImage shareInstance];
        [VSGameText shareInstance];
    }
    return self;
}

+ (VSGameResource *)shareInstance
{
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        if (nil == _gameResource) {
            _gameResource = [[VSGameResource alloc] init];
        }
    });
    return _gameResource;
}

@end
