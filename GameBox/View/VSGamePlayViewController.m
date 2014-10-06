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
@interface VSGamePlayViewController ()<UIWebViewDelegate>
@property (nonatomic,strong)UIWebView *webView;
@end

@implementation VSGamePlayViewController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    
    VSChannel *currentChannel = [[VSChannelList shareInstance] currentChannel];
    
    NSString *gameId = currentChannel.currentGameId;
    NSString *foudler = [[VSGameHtml shareInstance] htmlPath:gameId];
    NSString *filePath = [foudler stringByAppendingPathComponent:@"index.html"];
    NSURL *url = [NSURL fileURLWithPath:filePath];
    NSURLRequest *request = [NSURLRequest requestWithURL:url];
    _webView = [[UIWebView alloc] initWithFrame:self.view.bounds];
    _webView.delegate = self;
    
    [_webView loadRequest:request];
    [self.view addSubview:_webView];
    // Do any additional setup after loading the view.
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)webViewDidFinishLoad:(UIWebView *)webView;
{
    [webView stringByEvaluatingJavaScriptFromString:@"window.ios = {};"];
}

-(BOOL)webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType
{
    NSLog(@"request:%@", request.URL);
    return YES;
}

@end
