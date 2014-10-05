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


- (void)gameClick:(id)sender
{
    
}

- (void)galleryClick:(id)sender
{
    
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
@end
