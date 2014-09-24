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

@interface VSChannelViewController ()<UITableViewDataSource,UITableViewDelegate>
@property (nonatomic,weak)IBOutlet UITableView *table;
@end

@implementation VSChannelViewController


- (void)viewDidLoad
{
    [super viewDidLoad];
   
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

@end
