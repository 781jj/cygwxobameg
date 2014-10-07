//
//  VSRankingView.m
//  GameBox
//
//  Created by YaoMing on 14-10-6.
//  Copyright (c) 2014年 cyggame. All rights reserved.
//
#define VSRankTableViewCellHeight 55

#import "VSRankingView.h"
#import "VSGameDetailInfo.h"
#import "VSChannel.h"
#import "VSChannelList.h"
#import "VSRankTableViewCell.h"
@interface VSRankingView ()<UITableViewDelegate,UITableViewDataSource>
@property (nonatomic,strong)UITableView *tableView;
@end
@implementation VSRankingView

- (id) initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        
            _tableView = [[UITableView alloc] initWithFrame:frame style:UITableViewStylePlain];
            _tableView.delegate = self;
            _tableView.dataSource = self;
            _tableView.separatorStyle = UITableViewCellSeparatorStyleNone;
            _tableView.bounces = YES;
            _tableView.backgroundColor = [UIColor clearColor];
            self.backgroundColor = UIColorFromRGB(0xf0f2f5);
            
            return self;
        

    }
    return self;
}


- (void)reload
{
    VSChannel *channel = [VSChannelList shareInstance].currentChannel;
    VSGameDetailInfo *info = [[VSGameDetailInfo alloc] initWithGameId:channel.currentGameId];
    [info rankingList:^(BOOL success,NSArray *rankList){
            if (success && [rankList count]>0) {
                [_tableView reloadData];
            }
    }];
    
}



#pragma mark -- table delegate datasource

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section;
{
    VSChannel *channel = [VSChannelList shareInstance].currentChannel;
    VSGameDetailInfo *info = [[VSGameDetailInfo alloc] initWithGameId:channel.currentGameId];
    return [info.rankList count];
    
}


- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath
{
    return VSRankTableViewCellHeight;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath{
    static NSString *CellIdentifier = @"VSRanKingTableView";
    VSRankTableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:CellIdentifier];
    if (!cell){
        cell = [[VSRankTableViewCell alloc] initWithReuseId:CellIdentifier];
    }
    [cell update:indexPath.row];
    return cell;
}

- (UIView *)tableView:(UITableView *)tableView viewForHeaderInSection:(NSInteger)section
{
    
    UIView *view = [[UIView alloc] initWithFrame:CGRectMake(0, 0,  tableView.frame.size.width, 38.0)];
    view.backgroundColor = [UIColor clearColor];
    
    UILabel *head = [[UILabel alloc] initWithFrame:CGRectMake(24, 9, 150, 20)];
    head.text = @"Week Ranking";
    head.textAlignment = 0;
    head.textColor = [UIColor blackColor];
    head.font = [UIFont systemFontOfSize:18];
    [view addSubview:head];
    return view;
}

- (CGFloat)tableView:(UITableView *)tableView heightForHeaderInSection:(NSInteger)section
{
    return 38.0f;
}

@end
