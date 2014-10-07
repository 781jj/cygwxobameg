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
#import "VSBackBarButtonItem.h"
@interface VSGameDetailViewController ()
@property(nonatomic,weak)IBOutlet VSBroastView *broastView;
@property(nonatomic,weak)IBOutlet VSGameDetailInfoView *detailView;
@property(nonatomic,weak)IBOutlet VSGameIntroduceView *introduceView;
@end

@implementation VSGameDetailViewController



- (void)viewDidLoad
{
    [super viewDidLoad];
    self.navigationItem.leftBarButtonItem = [VSBackBarButtonItem backBarButtonItem:self selector:@selector(backButtonClick)];

    
    VSChannel *channel = [VSChannelList shareInstance].currentChannel;
    VSGameDetailInfo *info = [[VSGameDetailInfo alloc] initWithGameId:channel.currentGameId];
    [_introduceView reloadData:info];

    [_detailView reloadData:info];
    
    // Do any additional setup after loading the view.
}


- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)backButtonClick
{
    [self.navigationController popViewControllerAnimated:YES];
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
