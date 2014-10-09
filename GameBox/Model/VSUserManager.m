//
//  VSUserManager.m
//  GameBox
//
//  Created by YaoMing on 14-10-9.
//  Copyright (c) 2014年 cyggame. All rights reserved.
//

#import "VSUserManager.h"
#import "VSRequest.h"
#import "VSSessionManager.h"
#import "VSPassport.h"
#import "VSChannelList.h"
#import "VSChannel.h"
static VSUserManager *_userManager = nil;

@implementation VSUserManager
+ (VSUserManager *)shareInstance
{
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        if (nil == _userManager) {
            _userManager = [[VSUserManager alloc] init];
        }
    });
    return _userManager;
}

- (void)updateUserPlayInfo
{
    VSChannel *channel = [[VSChannelList shareInstance] currentChannel];
    NSString *currentGameId = [channel currentGameId];
    [VSRequest post:@"users/updateplayinfos" params:@{@"userid":[VSSessionManager shareInstance].passport.userId,@"gamenumber":currentGameId} success:^(NSURLRequest *request, id obj) {
        NSLog(@"%s:true",__func__);
    } failed:^(NSURLRequest *request, id obj, NSError *error) {
        NSLog(@"%s:false",__func__);
    }];
}
@end
