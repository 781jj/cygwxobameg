//
//  VSLoginViewController.m
//  GameBox
//
//  Created by YaoMing on 14-9-29.
//  Copyright (c) 2014年 cyggame. All rights reserved.
//

#import "VSLoginViewController.h"
#import "VSSessionManager.h"
#import "VSTempLoginMessage.h"
#import "VSCommon.h"
#import <FacebookSDK/FacebookSDK.h>
#import "VSParamLoginMessage.h"
#import "VSFacebookLoginHold.h"
@interface VSLoginViewController ()<FBLoginViewDelegate>
@property(nonatomic, strong)FBLoginView *loginView;
@end

@implementation VSLoginViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    _loginView = [[FBLoginView alloc] initWithReadPermissions:@[@"public_profile"]];
    _loginView.center = self.view.center;
    _loginView.frame = CGRectMake(_loginView.frame.origin.x,200, _loginView.frame.size.width, _loginView.frame.size.height);
    _loginView.delegate = self;
    _loginView.hidden = NO;
   // [self.view addSubview:_loginView];
    
    
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
    if (![VSSessionManager shareInstance].isLogin) {
        [MobClick beginLogPageView:VSEnterLoginView];
    }
    
}

- (void)viewWillDisappear:(BOOL)animated
{
    [super viewWillDisappear:animated];
    [MobClick endLogPageView:VSEnterLoginView];
}

- (void)viewDidAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
    
        
        UIStoryboard *storyBoard = [UIStoryboard storyboardWithName:@"Main" bundle:nil];
        UIViewController *home = [storyBoard instantiateViewControllerWithIdentifier:@"VSHomeViewController"];
        if ([VSSessionManager shareInstance].isLogin) {
            [self.navigationController pushViewController:home animated:YES];
        }
    
}

- (void)viewDidDisappear:(BOOL)animated
{
    [super viewDidDisappear:animated];
    [MobClick endEvent:VSEnterLoginView];
}


- (IBAction)facebookLogin:(id)sender
{
   
    // If the session state is any of the two "open" states when the button is clicked
    if (FBSession.activeSession.state == FBSessionStateOpen
        || FBSession.activeSession.state == FBSessionStateOpenTokenExtended) {
        [FBSession.activeSession closeAndClearTokenInformation];
    }
        [FBSession openActiveSessionWithReadPermissions:@[@"public_profile"]
                                           allowLoginUI:YES
                                      completionHandler:
         ^(FBSession *session, FBSessionState state, NSError *error) {
             [[VSFacebookLoginHold shareInstance] sessionStateChanged:session state:state error:error finished:^(BOOL finished){
                 UIStoryboard *storyBoard = [UIStoryboard storyboardWithName:@"Main" bundle:nil];
                 UIViewController *home = [storyBoard instantiateViewControllerWithIdentifier:@"VSHomeViewController"];
                 if ([VSSessionManager shareInstance].isLogin) {
                     [self.navigationController pushViewController:home animated:YES];
                 }
             }];
         }];

}

- (IBAction)twitterLogin:(id)sender
{
    
}

- (IBAction)directLogin:(id)sender
{
    [M2DHudView showLoading];
    VSTempLoginMessage *info = [VSTempLoginMessage new];
    [[VSSessionManager shareInstance] loginWithType:info finish:^(BOOL success,id msg){
            if (success) {
                [MobClick event:VSLoginTempSuccess];
                [M2DHudView hideLoading];
                UIStoryboard *storyBoard = [UIStoryboard storyboardWithName:@"Main" bundle:nil];
                UIViewController *home = [storyBoard instantiateViewControllerWithIdentifier:@"VSHomeViewController"];
                if ([VSSessionManager shareInstance].isLogin) {
                    [self.navigationController pushViewController:home animated:YES];
                }
            }else{
                [MobClick event:VSLoginTempFail];
            }
    }];
}




//-(void)loginWithFacebookSession:(FBSession *)session
//{
//    
//    [M2DHudView showLoading];
//    VSParamLoginMessage *info = [VSParamLoginMessage new];
//    info.nickName = session.accessTokenData.accessToken;
//    info.userName = session.accessTokenData.appID;
//    
//    [[VSSessionManager shareInstance] loginWithType:info finish:^(BOOL success,id msg){
//        if (success) {
//            [MobClick event:VSLoginFacebookSuccess];
//            [M2DHudView hideLoading];
//            [self dismissViewControllerAnimated:NO completion:nil];
//        }else{
//            [MobClick event:VSLoginFacebookFail];
//        }
//    }];
//}



@end
