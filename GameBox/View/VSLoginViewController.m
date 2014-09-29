//
//  VSLoginViewController.m
//  GameBox
//
//  Created by YaoMing on 14-9-29.
//  Copyright (c) 2014年 cyggame. All rights reserved.
//

#import "VSLoginViewController.h"
#import "VSSessionManager.h"
#import "VSTempLoginMessage.h"
@interface VSLoginViewController ()

@end

@implementation VSLoginViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}


- (IBAction)facebookLogin:(id)sender
{
    
}

- (IBAction)twitterLogin:(id)sender
{
    
}

- (IBAction)directLogin:(id)sender
{
    VSTempLoginMessage *info = [VSTempLoginMessage new];
    [[VSSessionManager shareInstance] loginWithType:info finish:^(BOOL success,id msg){
        if (success) {
            [self dismissViewControllerAnimated:NO completion:nil];
        }
    }];
}
/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
