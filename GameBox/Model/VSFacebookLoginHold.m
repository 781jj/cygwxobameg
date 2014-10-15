//
//  VSFacebookLoginHold.m
//  GameBox
//
//  Created by YaoMing on 14-10-15.
//  Copyright (c) 2014年 cyggame. All rights reserved.
//

#import "VSFacebookLoginHold.h"
#import "VSSessionManager.h"
#import "VSParamLoginMessage.h"
#import "VSPassport.h"
static VSFacebookLoginHold *_facebookHold = nil;
@implementation VSFacebookLoginHold

+ (VSFacebookLoginHold *)shareInstance{
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        if (nil == _facebookHold) {
            _facebookHold = [[VSFacebookLoginHold alloc] init];
        }
    });
    return _facebookHold;
}


- (void)sessionStateChanged:(FBSession *)session state:(FBSessionState) state error:(NSError *)error
{
    // If the session was opened successfully
    if (!error && state == FBSessionStateOpen){
        //login
        if (![VSSessionManager shareInstance].isLogin) {
            [self loginFacebook:session];
        }else{
            if ([[VSSessionManager shareInstance].passport isKindOfClass:NSClassFromString(@"VSTempPassport")]) {
                [self loginFacebook:session];
            }
        }
        return;
    }
    if (state == FBSessionStateClosed || state == FBSessionStateClosedLoginFailed){
        //close
    }
    
    if (error){
       //error
        [FBSession.activeSession closeAndClearTokenInformation];
    }
}

- (void)loginFacebook:(FBSession *)session
{
    [M2DHudView showLoading];
    VSParamLoginMessage *info = [VSParamLoginMessage new];
    info.nickName = session.accessTokenData.accessToken;
    info.userName = session.accessTokenData.appID;
    
    [[VSSessionManager shareInstance] loginWithType:info finish:^(BOOL success,id msg){
        if (success) {
            [MobClick event:VSLoginFacebookSuccess];
            [M2DHudView hideLoading];
          //  [self dismissViewControllerAnimated:NO completion:nil];
        }else{
            [MobClick event:VSLoginFacebookFail];
        }
    }];
}

@end
