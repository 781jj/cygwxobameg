//
//  VSIndividualCenterViewController.m
//  GameBox
//
//  Created by YaoMing on 14-10-8.
//  Copyright (c) 2014年 cyggame. All rights reserved.
//

#import "VSIndividualCenterViewController.h"
#import "VSSessionManager.h"
#import "VSPassport.h"
#import "VSImageView.h"
#import "SKSTableView.h"
#import "SKSTableViewCell.h"
#define VSUserTableViewCellHeight 66
@interface VSIndividualCenterViewController ()
@property (nonatomic,weak)IBOutlet VSImageView *photo;
@property (nonatomic,weak)IBOutlet UILabel *nameLabel;
@property (nonatomic,weak)IBOutlet UIView *errorView;
@property (nonatomic,weak)IBOutlet SKSTableView *tableView;

@end

@implementation VSIndividualCenterViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    _photo.layer.masksToBounds = YES;
    _photo.layer.cornerRadius = _photo.frame.size.width/2.0;
    
   // _tableView.SKSTableViewDelegate = self;
    [M2DHudView showLoading];
    [[VSSessionManager shareInstance].passport reloadInfo:^(BOOL success){
        [M2DHudView hideLoading];
        if (success) {
            _nameLabel.text = [VSSessionManager shareInstance].passport.userName;
            [_photo reloadImage:[VSSessionManager shareInstance].passport.photo];
            //todo
            [_tableView reloadData];
        }
    }];
    
    
    // Do any additional setup after loading the view.
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}


- (IBAction)editPerson:(id)sender
{
    
}


#pragma mark -- table delegate datasource


- (UIView *)tableView:(UITableView *)tableView viewForHeaderInSection:(NSInteger)section
{
    
    UIView *view = [[UIView alloc] initWithFrame:CGRectMake(0, 0,  tableView.frame.size.width, 30.0)];
    view.backgroundColor = [UIColor clearColor];
    
    UILabel *head = [[UILabel alloc] initWithFrame:CGRectMake(15, 0, 150, 20)];
    head.text = @"My Game";
    head.textAlignment = 0;
    head.textColor = [UIColor blackColor];
    head.font = [UIFont systemFontOfSize:20];
    [view addSubview:head];
    return view;
}

- (CGFloat)tableView:(UITableView *)tableView heightForHeaderInSection:(NSInteger)section
{
    return 30.0f;
}

@end
