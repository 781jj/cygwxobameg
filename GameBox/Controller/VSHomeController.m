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
            }else{
                [(VSHomeViewController *)home moveToChannel:0];
            }
        }
    }

}


- (void)pkClick:(id)sender
{
    
}
@end
