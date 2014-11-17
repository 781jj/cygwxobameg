//
//  AppDelegate.m
//  GameBox
//
//  Created by YaoMing on 14-9-20.
//  Copyright (c) 2014年 cyggame. All rights reserved.
//

#import "AppDelegate.h"
#import <FacebookSDK/FacebookSDK.h>
#import "VSGameResource.h"
#import "VSFacebookLoginHold.h"
#import "VSSessionManager.h"
#import "VSLoginViewController.h"
#import "VSTempLoginMessage.h"
@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    // Override point for customization after application launch.
    [MobClick startWithAppkey:@"543cca8ffd98c5173900e44b"];

    
    [VSGameResource shareInstance];
    
    VSTempLoginMessage *info = [VSTempLoginMessage new];
    [[VSSessionManager shareInstance] loginWithType:info finish:^(BOOL success,id msg){
        if (success) {
            [MobClick event:VSLoginTempSuccess];
        }else{
            [MobClick event:VSLoginTempFail];
        }
    }];
    
//    if (FBSession.activeSession.state == FBSessionStateCreatedTokenLoaded) {
//        // If there's one, just open the session silently, without showing the user the login UI
//        [FBSession openActiveSessionWithReadPermissions:@[@"public_profile"]
//                                           allowLoginUI:NO
//                                      completionHandler:^(FBSession *session, FBSessionState state, NSError *error) {
//                            if(![VSSessionManager shareInstance].isLogin ){
//                                UIViewController *controller =   [[UIApplication sharedApplication] keyWindow].rootViewController;
//                                if([controller isKindOfClass:[UINavigationController class]] ){
//                                    UINavigationController *nav = (UINavigationController *)controller;
//                                    if ([nav.topViewController isKindOfClass:[VSLoginViewController class]]) {
//                                            [[VSFacebookLoginHold shareInstance] sessionStateChanged:session state:state error:error finished:^(BOOL finished){
//                                                UIStoryboard *storyBoard = [UIStoryboard storyboardWithName:@"Main" bundle:nil];
//                                                UIViewController *home = [storyBoard instantiateViewControllerWithIdentifier:@"VSHomeViewController"];
//                                                if ([VSSessionManager shareInstance].isLogin) {
//                                                              [nav pushViewController:home animated:YES];
//                                                          }
//                                                    }];
//                                                }
//                                            }
//                                            }
//                                    }];
//            }
  
    return YES;
}
							
- (void)applicationWillResignActive:(UIApplication *)application
{
    // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
    // Use this method to pause ongoing tasks, disable timers, and throttle down OpenGL ES frame rates. Games should use this method to pause the game.
}

- (void)applicationDidEnterBackground:(UIApplication *)application
{
    // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later. 
    // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
    [MobClick event:VSEnterBackground];

}

- (void)applicationWillEnterForeground:(UIApplication *)application
{
    // Called as part of the transition from the background to the inactive state; here you can undo many of the changes made on entering the background.
    [MobClick event:VSEnterForeground];

}


- (void)applicationWillTerminate:(UIApplication *)application
{
    // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
}

#pragma mark facebook
//- (void)applicationDidBecomeActive:(UIApplication *)application
//{
//    // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
//    [FBAppCall handleDidBecomeActive];
//}
//
//- (BOOL)application:(UIApplication *)application
//            openURL:(NSURL *)url
//  sourceApplication:(NSString *)sourceApplication
//         annotation:(id)annotation
//{
//    return [FBSession.activeSession handleOpenURL:url];
//}




@end
