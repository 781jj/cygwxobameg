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


static NSString* const kGameboxSchema = @"gamebox";

@interface VSGamePlayViewController ()<UIWebViewDelegate>
@property (nonatomic,weak)IBOutlet UIWebView *webView;
@end

@implementation VSGamePlayViewController

- (void)dealloc
{
    [_webView stopLoading];
}



- (void)viewDidLoad
{
    [super viewDidLoad];
     self.navigationItem.leftBarButtonItem = [VSBackBarButtonItem backBarButtonItem:self selector:@selector(backButtonClick)];
    
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

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)webViewDidFinishLoad:(UIWebView *)webView;
{
    NSLog(@"succes");
    

}

- (void)webView:(UIWebView *)webView didFailLoadWithError:(NSError *)error
{
    NSLog(@"fail");
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
