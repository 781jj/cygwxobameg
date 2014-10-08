//
//  VSUserManager.m
//  GameBox
//
//  Created by YaoMing on 14-10-8.
//  Copyright (c) 2014年 cyggame. All rights reserved.
//

#import "VSUserManager.h"
#import "VSRequest.h"
#import "VSSessionManager.h"
#import "VSPassport.h"
static VSUserManager *_userManager = nil;

@interface VSUserManager ()

@end


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


- (void)reload:(VSUserReloadBlock )callback
{
    [VSRequest get:@"users/userinfo" params:@{@"userid":[VSSessionManager shareInstance].passport.userId} success:^(NSURLRequest *request , id msg) {
        
    } failed:^(NSURLRequest *request , id msg, NSError *error) {
        
    }];
}

- (void)reloadUserGame:(VSUserGameReloadBlock)callback
{
    
}
@end
