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
    [MobClick beginEvent:VSEnterLoginView];
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
        
        // Close the session and remove the access token from the cache
        // The session state handler (in the app delegate) will be called automatically
        [FBSession.activeSession closeAndClearTokenInformation];
        
        // If the session state is not any of the two "open" states when the button is clicked
    } else {
        // Open a session showing the user the login UI
        // You must ALWAYS ask for public_profile permissions when opening a session
        [FBSession openActiveSessionWithReadPermissions:@[@"public_profile",@"e_mail"]
                                           allowLoginUI:YES
                                      completionHandler:
         ^(FBSession *session, FBSessionState state, NSError *error) {
             [[VSFacebookLoginHold shareInstance] sessionStateChanged:session state:state error:error];
         }];
    }
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
                [self dismissViewControllerAnimated:NO completion:nil];
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
