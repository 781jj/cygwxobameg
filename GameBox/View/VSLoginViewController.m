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


- (IBAction)facebookLogin:(id)sender
{
   
    
    
//    // If the session state is any of the two "open" states when the button is clicked
//    if (FBSession.activeSession.state == FBSessionStateOpen
//        || FBSession.activeSession.state == FBSessionStateOpenTokenExtended) {
//        
//        // Close the session and remove the access token from the cache
//        // The session state handler (in the app delegate) will be called automatically
//        [FBSession.activeSession closeAndClearTokenInformation];
//        
//        // If the session state is not any of the two "open" states when the button is clicked
//    } else {
//        // Open a session showing the user the login UI
//        // You must ALWAYS ask for public_profile permissions when opening a session
//        [FBSession openActiveSessionWithReadPermissions:@[@"public_profile"]
//                                           allowLoginUI:YES
//                                      completionHandler:
//         ^(FBSession *session, FBSessionState state, NSError *error) {
//             
//             // Retrieve the app delegate
//             AppDelegate* appDelegate = [UIApplication sharedApplication].delegate;
//             // Call the app delegate's sessionStateChanged:state:error method to handle session state changes
//             [appDelegate sessionStateChanged:session state:state error:error];
//         }];
//    }
    

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
            [M2DHudView hideLoading];
            [self dismissViewControllerAnimated:NO completion:nil];
        }
    }];
    
}


#pragma mark - FBLoginViewDelegate methods
-(void)loginView:(FBLoginView *)loginView handleError:(NSError *)error
{
    NSString *alertMessage, *alertTitle;
    
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
    info.userName = user.id;
    
    [[VSSessionManager shareInstance] loginWithType:info finish:^(BOOL success,id msg){
        if (success) {
            [M2DHudView hideLoading];
            [self dismissViewControllerAnimated:NO completion:nil];
        }
    }];
}

-(void)loginViewShowingLoggedInUser:(FBLoginView *)loginView
{
    NSLog(@"gxx");
}

-(void)loginViewShowingLoggedOutUser:(FBLoginView *)loginView
{
    
}

@end
