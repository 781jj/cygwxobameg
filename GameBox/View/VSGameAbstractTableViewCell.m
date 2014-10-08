//
//  VSGameAbstractTableViewCell.m
//  GameBox
//
//  Created by YaoMing on 14-10-5.
//  Copyright (c) 2014年 cyggame. All rights reserved.
//

#import "VSGameAbstractTableViewCell.h"
#import "VSChannel.h"
#import "VSChannelList.h"
#import "VSGameDetailInfo.h"
#import "VSHomeController.h"
@interface VSGameAbstractTableViewCell ()

@property (nonatomic,strong)UIImageView *iconImageView;
@property (nonatomic,strong)UILabel *nameLabel;
@property (nonatomic,strong)UILabel *abstrctLabel;
@property (nonatomic,strong)UILabel *playsLabel;
@property (nonatomic,strong)UIButton *playButton;

@end
@implementation VSGameAbstractTableViewCell

- (id)initWithReuseId:(NSString *)reuseId;

{
    self = [super initWithStyle:UITableViewCellStyleDefault reuseIdentifier:reuseId];
    if (self) {
        self.backgroundColor = [UIColor clearColor];
        
        UIView *contentView = [[UIView alloc] initWithFrame:CGRectMake(self.bounds.size.width*0.025, 6, self.bounds.size.width*0.95, VSGameAbstractTableViewCellHeight*0.9)];
        contentView.backgroundColor = [UIColor whiteColor];
        [self addSubview:contentView];
        
        UIImageView *pic = [[UIImageView alloc] initWithFrame:CGRectMake(contentView.frame.size.height*0.05, contentView.frame.size.height*0.05, contentView.frame.size.height*0.9, contentView.frame.size.height*0.9)];
        [contentView addSubview:pic];
        _iconImageView = pic;
        
        UILabel *title = [[UILabel alloc] initWithFrame:CGRectMake(pic.frame.origin.x+pic.frame.size.width+contentView.frame.size.width*0.05, contentView.frame.size.height*0.1,  contentView.frame.size.width*0.45, contentView.frame.size.height*0.25)];
        title.font = [UIFont systemFontOfSize:18];
        title.textColor = [UIColor blackColor];
        title.textAlignment = 0;
        [contentView addSubview:title];
        _nameLabel = title;
        
        UILabel *abstract = [[UILabel alloc] initWithFrame:CGRectMake(pic.frame.origin.x+pic.frame.size.width+contentView.frame.size.width*0.05, title.frame.origin.y+title.frame.size.height,  contentView.frame.size.width*0.45, contentView.frame.size.height*0.6)];
        abstract.lineBreakMode = NSLineBreakByWordWrapping;
        abstract.numberOfLines = 3;
        abstract.font = [UIFont systemFontOfSize:10];
        abstract.textColor = UIColorFromRGB(0x868686);
        abstract.textAlignment = 0;
        [contentView addSubview:abstract];
        _abstrctLabel = abstract;
        
        UIButton *playButton = [UIButton buttonWithType:UIButtonTypeCustom];
        playButton.frame = CGRectMake(abstract.frame.origin.x+abstract.frame.size.width+5, contentView.frame.size.height*0.15, contentView.frame.size.width*0.24, contentView.frame.size.width*0.11);
        [playButton setImage:[UIImage imageNamed:@"btn_play_release"] forState:UIControlStateNormal];
        [playButton addTarget:[VSHomeController shareInstance] action:@selector(gamePlayClick:) forControlEvents:UIControlEventTouchUpInside];
        [contentView addSubview:playButton];
        _playButton = playButton;
        
        UILabel *players = [[UILabel alloc] initWithFrame:CGRectMake(playButton.frame.origin.x+playButton.frame.size.width*0.25,playButton.frame.origin.y+playButton.frame.size.height+contentView.frame.size.height*0.05, contentView.frame.size.width*0.2, contentView.frame.size.height*0.2)];
        players.font = [UIFont systemFontOfSize:12];
        players.textColor = [UIColor blackColor];
        players.textAlignment = 0;
        [contentView addSubview:players];
        _playsLabel = players;
        
        
    }
    return self;
}


- (void)update:(NSInteger )index;
{
    
    VSChannel *channel = [[VSChannelList shareInstance] currentChannel];
    if (index  >= [channel.gameList count] ) {
        return;
    }
    VSGameDetailInfo *gameDetail  = [channel.gameList objectAtIndex:index];

    _iconImageView.image = [UIImage imageWithContentsOfFile:gameDetail.iconPath];
    _nameLabel.text = gameDetail.name;
    _abstrctLabel.text = gameDetail.abstract;
    _playsLabel.text = [NSString stringWithFormat:@"+%ld",(long)gameDetail.players];
    _playButton.tag = index+1;

}

@end
