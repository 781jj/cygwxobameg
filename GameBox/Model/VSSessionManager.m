//
//  VSSessionManager.m
//  GameBox
//
//  Created by YaoMing on 14-9-29.
//  Copyright (c) 2014年 cyggame. All rights reserved.
//

#import "VSSessionManager.h"
#import "VSPassport.h"
#import "VSTempPassport.h"
#import "VSParamLoginMessage.h"
#import "VSLoginMessage.h"
#import "VSGamePassport.h"
@interface VSSessionManager()

@end

static VSSessionManager *_sessionManager = nil;
@implementation VSSessionManager

- (id)init
{
    self = [super init];
    if (self) {
        [self wakeup];
    }
    return self;
}


- (void)wakeup
{
    NSUserDefaults *user = [NSUserDefaults standardUserDefaults];
    NSData *data = [user objectForKey:@"VSPassportLoginInfo"];
    if (data) {
        VSPassport *passport = [NSKeyedUnarchiver unarchiveObjectWithData:data];
        _passport = passport;
    }
}
+ (VSSessionManager *)shareInstance
{
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        if (nil == _sessionManager) {
            _sessionManager = [[VSSessionManager alloc] init];
            
        }
    });
    return _sessionManager;
}


- (void)loginWithType:(VSLoginMessage *)info finish:(VSSessionLoginCallback)finish;
{
    __weak VSSessionManager *blockself = self;

    switch (info.type) {
        case VSTemp:
        {
            VSTempPassport *temp = [[VSTempPassport alloc] init];
            [temp doLogin:^(BOOL success,id msg){
                blockself.passport = temp;
                finish(success,msg);
            }];
            break;
        }
        case VSPara:
        {
            VSGamePassport *temp = [[VSGamePassport alloc] init];
            temp.nickname = ((VSParamLoginMessage *)info).nickName;
            temp.userName = ((VSParamLoginMessage *)info).userName;
            [temp doLogin:^(BOOL success,id msg){
                blockself.passport = temp;
                finish(success,msg);
            }];
            break;
        }
        case VSFacebook:
        {
            break;
        }
        case VSTwitter:
        {
            break;
        }
        default:
            break;
    }
}

- (void)logout
{
    
}

- (BOOL)isLogin
{
    return _passport && [_passport isLogin];
}


@end
