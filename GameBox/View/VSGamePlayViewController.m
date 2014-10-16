//
//  VSGamePlayViewController.m
//  GameBox
//
//  Created by YaoMing on 14-9-24.
//  Copyright (c) 2014年 cyggame. All rights reserved.
//

#import "VSGamePlayViewController.h"
#import "VSChannelList.h"
#import "VSGameHtml.h"
#import "VSBackBarButtonItem.h"
#import "VSUserManager.h"
#import "VSHomeController.h"
static NSString* const kGameboxSchema = @"gamebox";

@interface VSGamePlayViewController ()<UIWebViewDelegate>
@property (nonatomic,weak)IBOutlet UIWebView *webView;
@end

@implementation VSGamePlayViewController

- (void)dealloc
{
    [_webView stopLoading];
}


- (void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
    [MobClick beginLogPageView:VSPlayView];
    
}

- (void)viewWillDisappear:(BOOL)animated
{
    [super viewWillDisappear:animated];
    [MobClick endLogPageView:VSPlayView];
}


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
    
    self.title = @"Play Game";
    VSChannel *currentChannel = [[VSChannelList shareInstance] currentChannel];
    
    NSString *gameId = currentChannel.currentGameId;
    NSString *foudler = [[VSGameHtml shareInstance] htmlPath:gameId];
    NSString *filePath = [foudler stringByAppendingPathComponent:@"index.html"];
    NSURL *url = [NSURL fileURLWithPath:filePath];
    NSURLRequest *request = [NSURLRequest requestWithURL:url];
    
    [_webView loadRequest:request];
    
    [[VSUserManager shareInstance]updateUserPlayInfo];
    // Do any additional setup after loading the view.
}


- (void)backButtonClick
{
    [self.navigationController popViewControllerAnimated:YES];
}

- (IBAction)share:(id)sender
{
    [[VSHomeController shareInstance] share];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)webViewDidFinishLoad:(UIWebView *)webView;
{
    VSChannel *currentChannel = [[VSChannelList shareInstance] currentChannel];
    [MobClick event:VSLoadPlaySuccess attributes:@{@"gameid":currentChannel.currentGameId}];
}

- (void)webView:(UIWebView *)webView didFailLoadWithError:(NSError *)error
{
    VSChannel *currentChannel = [[VSChannelList shareInstance] currentChannel];
    [MobClick event:VSLoadPlayFail attributes:@{@"gameid":currentChannel.currentGameId}];
}

-(BOOL)webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType
{
    NSLog(@"request:%@", request.URL);
    if ([request.URL.scheme isEqualToString:kGameboxSchema]){
        
        return NO;
    }
    return YES;
}





@end
