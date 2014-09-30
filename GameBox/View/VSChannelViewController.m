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
    [self.view addSubview:tableView];
    NSLog(@"%f,%f,%f,%f",tableView.frame.origin.x,tableView.frame.origin.y,
          tableView.frame.size.width,tableView.frame.size.height);
    
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

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath{
    static NSString *CellIdentifier = @"test";

    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:CellIdentifier];
    if (!cell){
        cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleValue1 reuseIdentifier:CellIdentifier];
    }
    VSChannel *channel = [[VSChannelList shareInstance] currentChannel];
    
    if (indexPath.row >= [channel.gameList count] ) {
        return cell;
    }
    
    VSGameDetailInfo *info = [channel.gameList objectAtIndex:indexPath.row];
    cell.textLabel.text = info.name;
    cell.detailTextLabel.text = info.gameId;
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
