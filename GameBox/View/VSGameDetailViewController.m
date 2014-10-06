//
//  VSGameDetailViewController.m
//  GameBox
//
//  Created by YaoMing on 14-9-24.
//  Copyright (c) 2014年 cyggame. All rights reserved.
//

#import "VSGameDetailViewController.h"
#import "VSGameDetailInfoView.h"
#import "VSGameIntroduceView.h"
#import "VSBroastView.h"
#import "VSGameDetailInfo.h"
#import "VSChannel.h"
#import "VSChannelList.h"
@interface VSGameDetailViewController ()
@property(nonatomic,weak)IBOutlet VSBroastView *broastView;
@property(nonatomic,weak)IBOutlet VSGameDetailInfoView *detailView;
@property(nonatomic,weak)IBOutlet VSGameIntroduceView *introduceView;
@end

@implementation VSGameDetailViewController


- (void)viewDidLoad
{
    [super viewDidLoad];
    VSChannel *channel = [VSChannelList shareInstance].currentChannel;
    if ([channel.gameList count]>[channel.currentGameId integerValue]) {
        VSGameDetailInfo *info = [channel.gameList objectAtIndex:[channel.currentGameId integerValue]];
        [_detailView reloadData:info];
        [_introduceView reloadData:info];
    }
    // Do any additional setup after loading the view.
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender
{
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
