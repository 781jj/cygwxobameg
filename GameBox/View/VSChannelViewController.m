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

#import "VSFavorGame.h"
#import "VSGameBroadcast.h"
#import "VSGalleryTableViewCell.h"
#import "VSBroastTableViewCell.h"
#import "VSGameAbstractTableViewCell.h"
#import "VSHomeController.h"
@interface VSChannelViewController ()<UITableViewDataSource,UITableViewDelegate>
@property (nonatomic,strong )UITableView *table;
@end

@implementation VSChannelViewController


- (void)viewDidLoad
{
    [super viewDidLoad];

    UITableView *tableView = [[UITableView alloc] initWithFrame:CGRectMake(0, 0, CGRectGetWidth(self.view.frame), CGRectGetHeight(self.view.frame)-100) style:UITableViewStylePlain];
    tableView.delegate = self;
    tableView.dataSource = self;
    tableView.separatorStyle = UITableViewCellSeparatorStyleNone;
    tableView.bounces = YES;
    tableView.backgroundColor = UIColorFromRGB(0xf0f2f5);
    
    [self.view addSubview:tableView];

    _table = tableView;
    
    VSChannel *channel = [[VSChannelList shareInstance] channelWithType:_type];
    [channel loadData:^(BOOL success,id msg){
        if (success) {
            [_table performSelectorOnMainThread:@selector(reloadData) withObject:nil waitUntilDone:NO];
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
    VSChannel *channel = [[VSChannelList shareInstance] currentChannel];
    NSInteger index = indexPath.row;
    if (index >= [channel.gameList count] ) {
         return 44;
    }
    
    id data = [channel.gameList objectAtIndex:index];
    if ([data isKindOfClass:[VSFavorGame class]]) {
        return VSGalleryTableViewCellHeight;
    }else if ([data isKindOfClass:[VSGameBroadcast class]]){
        return VSBroastTableViewCellHeight;
    }else{
        return VSGameAbstractTableViewCellHeight;
    }
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
    
    
    id data = [channel.gameList objectAtIndex:index];
    NSString *identifier = NSStringFromClass([data class]);
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:identifier];
    if (!cell){
        if ([data isKindOfClass:[VSFavorGame class]]) {
            cell = [[VSGalleryTableViewCell alloc] initWithReuseId:identifier];
        }else if ([data isKindOfClass:[VSGameBroadcast class]]){
            cell = [[VSBroastTableViewCell alloc] initWithReuseId:identifier];
        }else{
            cell = [[VSGameAbstractTableViewCell alloc] initWithReuseId:identifier];
        }
    }
    
    if ([data isKindOfClass:[VSGameDetailInfo class]]){
        [(VSGameAbstractTableViewCell *)cell update:index];
    }
    
    return cell;
}


- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    [[VSHomeController shareInstance] gameClick:[NSString stringWithFormat:@"%ld",(long)indexPath.row]];
}


@end
