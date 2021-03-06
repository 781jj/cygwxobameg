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
#import "VSChannelSwitch.h"
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

    [super viewDidLoad];
    
//    self.navigationController.navigationBarHidden = NO;
 //   [self.navigationItem setHidesBackButton:YES];
//    self.automaticallyAdjustsScrollViewInsets = NO;
    
    [_scrollview setContentSize:CGSizeMake(_scrollview.bounds.size.width, _scrollview.bounds.size.height)];
    _scrollview.scrollEnabled = NO;

  
        VSChannelViewController *controller = [[VSChannelViewController alloc] init];
        controller.type = 2;
        [self addChildViewController:controller];
        controller.view.frame = CGRectForVCAtIndex(0);
        [_scrollview addSubview:controller.view];
        [controller didMoveToParentViewController:self];
        
    
    // Do any additional setup after loading the view.
}

//- (void)addNew
//{
//    VSChannelViewController *controller = [[VSChannelViewController alloc] init];
//    controller.type = 1;
//    [self addChildViewController:controller];
//    controller.view.frame = CGRectForVCAtIndex(1);
//    [_scrollview addSubview:controller.view];
//    [controller didMoveToParentViewController:self];
//}

- (void)moveToChannel:(NSInteger )index
{
    [_scrollview setContentOffset:CGPointMake(_scrollview.frame.size.width*index, 0) animated:YES];
}


- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)viewDidAppear:(BOOL)animated
{
    [super viewDidAppear:animated];

}

- (void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
    [MobClick beginLogPageView:VSChannelView];
  
    
}

- (void)viewWillDisappear:(BOOL)animated
{
    [super viewWillDisappear:animated];
    [MobClick endLogPageView:VSChannelView];
}

- (IBAction)playInfo:(id)sender
{
    
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
