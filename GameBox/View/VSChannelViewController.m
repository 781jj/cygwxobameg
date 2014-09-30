//
//  VSChannelViewController.m
//  GameBox
//
//  Created by YaoMing on 14-9-20.
//  Copyright (c) 2014年 cyggame. All rights reserved.
//

#import "VSChannelViewController.h"
#import "VSChannelList.h"
#import "VSGameDetailInfo.h"
#import "VSGamePlayViewController.h"
#import "VSChannel.h"
@interface VSChannelViewController ()<UITableViewDataSource,UITableViewDelegate>
@property (nonatomic,strong )UITableView *table;
@end

@implementation VSChannelViewController


- (void)viewDidLoad
{
    [super viewDidLoad];
    UITableView *tableView = [[UITableView alloc] initWithFrame:CGRectMake(0, 0, CGRectGetWidth(self.view.frame), CGRectGetHeight(self.view.frame)) style:UITableViewStylePlain];
    tableView.delegate = self;
    tableView.dataSource = self;
    tableView.separatorStyle = UITableViewCellSeparatorStyleNone;
    tableView.bounces = YES;
    
    [self.view addSubview:tableView];

    _table = tableView;
    
    VSChannel *channel = [[VSChannelList shareInstance] channelWithType:_type];
    [channel loadData:^(BOOL success,id msg){
        if (success) {
            [_table reloadData];
        }
    }];

    
    // Do any additional setup after loading the view.
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section;

{
    VSChannel *channel = [[VSChannelList shareInstance] currentChannel];
    return [channel.gameList count];
}


- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath
{
    return 44;
}
- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath{
    
    VSChannel *channel = [[VSChannelList shareInstance] currentChannel];
    NSInteger index = indexPath.row;
    if (index >= [channel.gameList count] ) {
        static NSString *CellIdentifier = @"UITableViewCell";
        UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:CellIdentifier];
        if (!cell){
            cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleValue1 reuseIdentifier:CellIdentifier];
        }
        return cell;
    }
    
    
    id cellInfo = [channel.gameList objectAtIndex:index];
    NSString *identifier = NSStringFromClass([cellInfo class]);
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:identifier];
    if (!cell){
        cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleValue1 reuseIdentifier:identifier];
    }
    
    if ([cellInfo isKindOfClass:[VSGameDetailInfo class]]) {
        VSGameDetailInfo *info = (VSGameDetailInfo *)cellInfo;
        cell.textLabel.text = info.name;
        cell.detailTextLabel.text = info.gameId;
    }

    return cell;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    VSChannel *channel = [[VSChannelList shareInstance] currentChannel];

    
    NSInteger index = indexPath.row;
    VSGameDetailInfo *info = [channel.gameList objectAtIndex:index];
    channel.currentGameId = info.gameId;
    
    VSGamePlayViewController *play = [[VSGamePlayViewController alloc] init];
    
    [self.navigationController pushViewController:play animated:YES];
}

@end
