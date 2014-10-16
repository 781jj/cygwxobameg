//
//  VSHomeController.m
//  GameBox
//
//  Created by YaoMing on 14-10-5.
//  Copyright (c) 2014年 cyggame. All rights reserved.
//

#import "VSHomeController.h"
#import "VSChannelViewController.h"
#import "VSHomeViewController.h"
#import "VSChannelList.h"
#import "VSChannel.h"
#import "VSGameDetailInfo.h"
#import "VSFavorGame.h"
#import <FacebookSDK/FacebookSDK.h>
#import "VSChannel.h"
#import "VSChannelList.h"
#import "VSGameDetailInfo.h"
#import "VSGameText.h"
#define DownloadLink @"https://itunes.apple.com/us/app/fas-calculator/id874866243?ls=1&mt=8"

static VSHomeController *_homeController = nil;
@implementation VSHomeController
+ (VSHomeController *)shareInstance{
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        if (nil == _homeController) {
            _homeController = [[VSHomeController alloc] init];
        }
    });
    return _homeController;
}

- (void)gameClick:(NSString *)sender
{
    NSInteger index = [(NSString *)sender integerValue];
    UIViewController *controller =   [[UIApplication sharedApplication] keyWindow].rootViewController;
    if([controller isKindOfClass:[UINavigationController class]] ){
        NSInteger gameIndex = index;
        VSChannel *channel = [[VSChannelList shareInstance] currentChannel];
        if (gameIndex < [channel.gameList count] && gameIndex>=0) {
            VSGameDetailInfo *info = [channel.gameList objectAtIndex:gameIndex];
            if ([info isKindOfClass:[VSGameDetailInfo class]]) {
                channel.currentGameId = info.gameId;
            }
        }
        
        
        [MobClick event:VSClickListView attributes:@{@"channelid":[NSString stringWithFormat:@"%d",channel.type],@"gameid":channel.currentGameId}];
        UINavigationController *nav = (UINavigationController *)controller;
        UIStoryboard *storyBoard = [UIStoryboard storyboardWithName:@"Main" bundle:nil];
        UIViewController *detail = [storyBoard instantiateViewControllerWithIdentifier:@"VSGameDetailView"];
        [nav pushViewController:detail animated:YES];
    }

}


- (void)gamePlayClick:(UIButton *)sender
{
    UIViewController *controller =   [[UIApplication sharedApplication] keyWindow].rootViewController;

    if([controller isKindOfClass:[UINavigationController class]] ){
        NSInteger tag = sender.tag;
        NSInteger gameIndex = tag - 1;
        VSChannel *channel = [[VSChannelList shareInstance] currentChannel];
        if (gameIndex < [channel.gameList count] && gameIndex>=0) {
            VSGameDetailInfo *info = [channel.gameList objectAtIndex:gameIndex];
            if ([info isKindOfClass:[VSGameDetailInfo class]]) {
                channel.currentGameId = info.gameId;
            }
        }
        
        [MobClick event:VSGameStartClick attributes:@{@"channelid":[NSString stringWithFormat:@"%d",channel.type],@"gameid":channel.currentGameId,@"origin":@"home"}];
        UINavigationController *nav = (UINavigationController *)controller;
        UIStoryboard *storyBoard = [UIStoryboard storyboardWithName:@"Main" bundle:nil];
        UIViewController *detail = [storyBoard instantiateViewControllerWithIdentifier:@"VSGamePlayViewController"];
        [nav pushViewController:detail animated:YES];
    }

  
}

- (void)galleryClick:(UIButton *)sender
{
    UIViewController *controller =   [[UIApplication sharedApplication] keyWindow].rootViewController;
    if([controller isKindOfClass:[UINavigationController class]] ){
        NSInteger tag = sender.tag;
        NSInteger gameIndex = tag - 1;
        VSChannel *channel = [[VSChannelList shareInstance] currentChannel];
        if ([channel.gameList count]>0) {
            VSFavorGame *favor = [channel.gameList objectAtIndex:0];
            if ([favor isKindOfClass:[VSFavorGame class]]) {
                if (gameIndex < [favor.favorlist count] && gameIndex>=0) {
                    VSGameDetailInfo *info = [favor.favorlist objectAtIndex:gameIndex];
                    channel.currentGameId = info.gameId;
                }
            }
        }
        
        
        [MobClick event:VSClickFavorView attributes:@{@"channelid":[NSString stringWithFormat:@"%d",channel.type],@"gameid":channel.currentGameId}];
        UIStoryboard *storyBoard = [UIStoryboard storyboardWithName:@"Main" bundle:nil];
        UIViewController *detail = [storyBoard instantiateViewControllerWithIdentifier:@"VSGameDetailView"];
        UINavigationController *nav = (UINavigationController *)controller;
        [nav pushViewController:detail animated:YES];
    }

}

- (void)channelClick:(id)sender
{
    UIViewController *controller =   [[UIApplication sharedApplication] keyWindow].rootViewController;
    if([controller isKindOfClass:[UINavigationController class]] ){
        UINavigationController *nav = (UINavigationController *)controller;
        UIViewController *home = [nav topViewController];
        if ([home isKindOfClass:[VSHomeViewController class]]) {
            if ([sender isEqualToString:@"new"]) {
                [(VSHomeViewController *)home moveToChannel:1];
                [MobClick event:VSChannelSwitchClick attributes:@{@"channelid":@"2"}];
            }else{
                [(VSHomeViewController *)home moveToChannel:0];
                [MobClick event:VSChannelSwitchClick attributes:@{@"channelid":@"1"}];

            }
            
            
        }
    }

}


- (void)pkClick:(id)sender
{
    
}



- (void)share
{
    [FBSettings setDefaultDisplayName:[[FBSettings defaultDisplayName] precomposedStringWithCanonicalMapping]];
    
    VSChannel *currentChannel = [[VSChannelList shareInstance] currentChannel];
    
    NSString *gameId = currentChannel.currentGameId;
    NSString *shareUrl = [[VSGameText shareInstance] gameImageLink:gameId];
    if (!shareUrl) {
        shareUrl = @"http://i1372.photobucket.com/albums/ag327/Gamebox_Cyg/gamebox/Icon2x_zps9b54a303.png";
    }
   
    NSString *shareConent = [[VSGameText shareInstance] gameShare:gameId];
    if (!shareConent) {
        shareConent = @"Html5 Game Pocket";
    }
    FBLinkShareParams *linkparams = [[FBLinkShareParams alloc] init];
    linkparams.link = [NSURL URLWithString:DownloadLink];
    linkparams.caption = @"Game Pocket";
    linkparams.name = @"Game Pocket";
    linkparams.picture = [NSURL URLWithString:shareUrl];
    linkparams.linkDescription = shareConent;
   
    
    // If the Facebook app is installed and we can present the share dialog
    if ([FBDialogs canPresentShareDialogWithParams:linkparams]) {
        
        [FBDialogs presentShareDialogWithParams:linkparams clientState:nil handler:^(FBAppCall *call, NSDictionary *results, NSError *error) {
            if(error) {
                
            } else {
                
            }
        }];
    }else{
        // Show the feed dialog
        NSMutableDictionary *params = [NSMutableDictionary dictionaryWithObjectsAndKeys:
                                       @"Game Pocket", @"name",
                                       @"Game Pocket", @"caption",
                                       shareConent, @"description",
                                       DownloadLink, @"link",
                                       shareUrl,@"picture",
                                       nil];
        [FBWebDialogs presentFeedDialogModallyWithSession:nil
                                               parameters:params
                                                  handler:^(FBWebDialogResult result, NSURL *resultURL, NSError *error) {
                                                      if (error) {
                                                          // An error occurred, we need to handle the error
                                                          // See: https://developers.facebook.com/docs/ios/errors
                                                          // NSLog(@"Error publishing story: %@", error.description);
                                                      } else {
                                                          if (result == FBWebDialogResultDialogNotCompleted) {
                                                              // User canceled.
                                                              //  NSLog(@"User cancelled.");
                                                          } else {
                                                              
                                                          }
                                                      }
                                                  }];
    }
}
@end
