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
#import "VSChannelViewController.h"

#define CGRectForVCAtIndex(index) CGRectMake(index*(CGRectGetWidth(self.scrollview.frame)), 0, \
CGRectGetWidth(self.scrollview.frame), CGRectGetHeight(self.scrollview.frame))

@interface VSHomeViewController ()<UIScrollViewDelegate>
{
    BOOL _isshow ;
}

@property (nonatomic,weak)IBOutlet UIScrollView *scrollview;
@end

@implementation VSHomeViewController

- (void)viewDidLoad {
    [_scrollview setContentSize:CGSizeMake(_scrollview.bounds.size.width*2.0, _scrollview.bounds.size.height)];
    NSLog(@"%@",_scrollview);
    for (int i = 0; i<2; i++) {
        VSChannelViewController *controller = [[VSChannelViewController alloc] init];
        controller.type = i+1;
        [self addChildViewController:controller];

        controller.view.frame = CGRectForVCAtIndex(i);
        
        _scrollview.scrollsToTop = YES;

        [_scrollview scrollRectToVisible:CGRectMake (0, 0, 0, 0) animated:NO];
        [_scrollview addSubview:controller.view];
        [controller didMoveToParentViewController:self];
        NSLog(@"%f,%f,%f,%f",controller.view.frame.origin.x,controller.view.frame.origin.y,
              controller.view.frame.size.width,controller.view.frame.size.height);

    }
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
