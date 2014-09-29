//
//  VSHomeViewController.m
//  GameBox
//
//  Created by YaoMing on 14-9-29.
//  Copyright (c) 2014年 cyggame. All rights reserved.
//

#import "VSHomeViewController.h"
#import "VSSessionManager.h"
#import "VSLoginViewController.h"
@interface VSHomeViewController ()
{
    BOOL _isshow ;
}
@end

@implementation VSHomeViewController

- (void)viewDidLoad {
    

    [super viewDidLoad];
    // Do any additional setup after loading the view.
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)viewDidAppear:(BOOL)animated
{
    [super viewDidAppear:animated];
    if (!_isshow) {
        _isshow = YES;
        UIStoryboard *storyBoard = [UIStoryboard storyboardWithName:@"Main" bundle:nil];
        UIViewController *login = [storyBoard instantiateViewControllerWithIdentifier:@"VSLoginView"];
        if (![VSSessionManager shareInstance].isLogin) {
            [self.navigationController presentViewController:login animated:NO completion:nil];
        }
    }
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
