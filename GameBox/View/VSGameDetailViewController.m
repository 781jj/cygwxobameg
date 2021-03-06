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
#import "VSHomeController.h"
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
    UIButton *rightBtn = [UIButton buttonWithType:UIButtonTypeCustom];
    rightBtn.exclusiveTouch = YES;
    UIImage *rightBtnImage = [UIImage imageNamed:@"icon_share"];
    rightBtn.frame = CGRectMake(0, 0, rightBtnImage.size.width, rightBtnImage.size.height);
    [rightBtn setImage:rightBtnImage forState:UIControlStateNormal];
    [rightBtn addTarget:self action:@selector(share:) forControlEvents:UIControlEventTouchUpInside];
    UIBarButtonItem *menuButton = [[UIBarButtonItem alloc] initWithCustomView:rightBtn];
    self.navigationItem.rightBarButtonItem = menuButton;
    
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

- (IBAction)share:(id)sender
{
    [[VSHomeController shareInstance] share];
}

- (IBAction)startClick:(id)sender
{
    VSChannel *channel = [VSChannelList shareInstance].currentChannel;
    [MobClick event:VSGameStartClick attributes:@{@"channelid":[NSString stringWithFormat:@"%d",channel.type],@"gameid":channel.currentGameId,@"origin":@"detail"}];
}




- (void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
    [MobClick beginLogPageView:VSDetailView];
    
}

- (void)viewWillDisappear:(BOOL)animated
{
    [super viewWillDisappear:animated];
    [MobClick endLogPageView:VSDetailView];
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
