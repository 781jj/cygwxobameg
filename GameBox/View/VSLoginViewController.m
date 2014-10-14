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
    [self.view addSubview:_loginView];
    
    
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


#pragma mark - FBLoginViewDelegate methods
-(void)loginView:(FBLoginView *)loginView handleError:(NSError *)error
{
    NSString *alertMessage, *alertTitle;
    [MobClick event:VSLoginFacebookFail];

    // If the user should perform an action outside of you app to recover,
    // the SDK will provide a message for the user, you just need to surface it.
    // This conveniently handles cases like Facebook password change or unverified Facebook accounts.
    if ([FBErrorUtility shouldNotifyUserForError:error]) {
        alertTitle = @"Facebook error";
        alertMessage = [FBErrorUtility userMessageForError:error];
        
        // This code will handle session closures that happen outside of the app
        // You can take a look at our error handling guide to know more about it
        // https://developers.facebook.com/docs/ios/errors
    } else if ([FBErrorUtility errorCategoryForError:error] == FBErrorCategoryAuthenticationReopenSession) {
        alertTitle = @"Session Error";
        alertMessage = @"Your current session is no longer valid. Please log in again.";
        
        // If the user has cancelled a login, we will do nothing.
        // You can also choose to show the user a message if cancelling login will result in
        // the user not being able to complete a task they had initiated in your app
        // (like accessing FB-stored information or posting to Facebook)
    } else if ([FBErrorUtility errorCategoryForError:error] == FBErrorCategoryUserCancelled) {
        NSLog(@"user cancelled login");
        
        // For simplicity, this sample handles other errors with a generic message
        // You can checkout our error handling guide for more detailed information
        // https://developers.facebook.com/docs/ios/errors
    } else {
        alertTitle  = @"Something went wrong";
        alertMessage = @"Please try again later.";
        NSLog(@"Unexpected error:%@", error);
    }
    
    if (alertMessage) {
        [[[UIAlertView alloc] initWithTitle:alertTitle
                                    message:alertMessage
                                   delegate:nil
                          cancelButtonTitle:@"OK"
                          otherButtonTitles:nil] show];
    }
}

-(void)loginViewFetchedUserInfo:(FBLoginView *)loginView user:(id<FBGraphUser>)user
{
    
    [M2DHudView showLoading];
    VSParamLoginMessage *info = [VSParamLoginMessage new];
    info.nickName = user.name;
    info.userName = user.objectID;
    
    [[VSSessionManager shareInstance] loginWithType:info finish:^(BOOL success,id msg){
        if (success) {
            [MobClick event:VSLoginFacebookSuccess];
            [M2DHudView hideLoading];
            [self dismissViewControllerAnimated:NO completion:nil];
        }else{
            [MobClick event:VSLoginFacebookFail];
        }
    }];
}

-(void)loginViewShowingLoggedInUser:(FBLoginView *)loginView
{
   
}

-(void)loginViewShowingLoggedOutUser:(FBLoginView *)loginView
{
    
}

@end
