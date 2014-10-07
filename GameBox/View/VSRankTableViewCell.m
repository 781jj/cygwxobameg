//
//  VSRankTableViewCell.m
//  GameBox
//
//  Created by YaoMing on 14-10-7.
//  Copyright (c) 2014年 cyggame. All rights reserved.
//

#import "VSRankTableViewCell.h"
#import <QuartzCore/QuartzCore.h>
#import "VSHomeController.h"
#import "VSChannel.h"
#import "VSChannelList.h"
#import "VSGameDetailInfo.h"
#import "VSRankingInfo.h"
@interface VSRankTableViewCell ()

@property (nonatomic,strong)UILabel *rankLabel;
@property (nonatomic,strong)UIImageView *rankTrendImageView;
@property (nonatomic,strong)UILabel *varietyLabel;
@property (nonatomic,strong)UIImageView *photoView;
@property (nonatomic,strong)UIImageView *genderView;
@property (nonatomic,strong)UILabel *scoreLabel;
@property (nonatomic,strong)UILabel *nameLabel;

@end

@implementation VSRankTableViewCell



- (id)initWithReuseId:(NSString *)reuseId
{
    self = [super initWithStyle:UITableViewCellStyleDefault reuseIdentifier:reuseId];
    if (self) {
        self.selectionStyle = UITableViewCellSelectionStyleNone;
        self.backgroundColor = [UIColor clearColor];
        
        UIView *contentView = [[UIView alloc] initWithFrame:CGRectMake(0, 0, self.bounds.size.width,self.bounds.size.height)];
        contentView.backgroundColor = [UIColor clearColor];
        [self addSubview:contentView];
        
        UIView *line = [[UIView alloc] initWithFrame:CGRectMake(0, 0, contentView.frame.size.width, 1)];
        line.backgroundColor = [UIColor whiteColor];
        [contentView addSubview:line];
       
        float sizeWidth = contentView.frame.size.width;
        float sizeHeight = contentView.frame.size.height;
        
        
        UILabel *rank = [[UILabel alloc] initWithFrame:CGRectMake(sizeWidth*0.09, sizeHeight*0.2, 25    , 40)];
        rank.font = [UIFont boldSystemFontOfSize:22];
        rank.textAlignment = 0;
        [contentView addSubview:rank];
        _rankLabel = rank;
        
        UIImageView *trend = [[UIImageView alloc] initWithFrame:CGRectMake(CGRectGetMaxX(rank.frame)+2,rank.frame.origin.y+18,7, 6)];
        [contentView addSubview:trend];
        _rankTrendImageView = trend;
        
        UILabel *variety = [[UILabel alloc] initWithFrame:CGRectMake(CGRectGetMaxX(trend.frame)+2, CGRectGetMidY(trend.frame),20 , 10)];
        variety.font = [UIFont systemFontOfSize:8];
        variety.textAlignment = 0;
        variety.backgroundColor = [UIColor clearColor];
        [contentView addSubview:variety];
        _varietyLabel = variety;
        
        UIImageView *photo = [[UIImageView alloc] initWithFrame:CGRectMake(CGRectGetMaxX(variety.frame)+8, 0.1*sizeHeight, 43, 43)];
        photo.layer.masksToBounds = YES;
        photo.layer.cornerRadius = 21.5;
        [contentView addSubview:photo];
        _photoView = photo;
        
        UIImageView *gemder = [[UIImageView alloc] initWithFrame:CGRectMake(CGRectGetMaxX(photo.frame)+12, 0.25*sizeHeight, 9, 14)];
        [contentView addSubview:gemder];
        _genderView = gemder;
        
        UILabel *name = [[UILabel alloc] initWithFrame:CGRectMake(CGRectGetMaxX(gemder.frame)+4, CGRectGetMidY(gemder.frame)-2, sizeWidth*0.35,17)];
        name.textAlignment = 0;
        name.font = [UIFont boldSystemFontOfSize:16];
        name.backgroundColor = [UIColor clearColor];
        name.textColor = UIColorFromRGB(0x312f32);
        [contentView addSubview:name];
        _nameLabel = name;
        
        UILabel *scoreTag = [[UILabel alloc] initWithFrame:CGRectMake(CGRectGetMinX(gemder.frame), CGRectGetMaxY(gemder.frame)+8, 80, 14)];
        scoreTag.font = [UIFont systemFontOfSize:13];
        scoreTag.textAlignment = 0;
        scoreTag.backgroundColor = [UIColor clearColor];
        scoreTag.text = @"Score:";
        scoreTag.textColor = UIColorFromRGB(0x312f32);
        [contentView addSubview:scoreTag];
        
        UILabel *score = [[UILabel alloc] initWithFrame:CGRectMake(CGRectGetMaxX(scoreTag.frame)+4, CGRectGetMaxY(gemder.frame)+4, 90, 16)];
        score.font = [UIFont systemFontOfSize:16];
        score.textAlignment = 0;
        score.backgroundColor = [UIColor clearColor];
        score.textColor = UIColorFromRGB(0x312f32);
        [contentView addSubview:score];
        _scoreLabel = score;
        
        
        UIButton *pkBtn = [UIButton buttonWithType:UIButtonTypeCustom];
        pkBtn.frame = CGRectMake(sizeWidth-62, (sizeHeight-38)/2.0, 38,38);
        [pkBtn setImage:[UIImage imageNamed:@"btn_pk_released"] forState:UIControlStateNormal];
        [pkBtn addTarget:[VSHomeController shareInstance] action:@selector(pkClick:) forControlEvents:UIControlEventTouchUpInside];
        [contentView addSubview:pkBtn];
    }
    return self;
}

- (void)update:(NSInteger )index
{
    VSChannel *channel = [VSChannelList shareInstance].currentChannel;
    VSGameDetailInfo *game = [[VSGameDetailInfo alloc] initWithGameId:channel.currentGameId];
    if ([game.rankList count]>index && index >0) {
            VSRankingInfo *rank = [game.rankList objectAtIndex:index];
            [self updateRank:rank];
            
            _photoView.image = [UIImage imageWithData:[NSData dataWithContentsOfURL:[NSURL URLWithString:rank.photoPath]]];
            if (rank.gender) {
                _genderView.image = [UIImage imageNamed:@"symbol_male"];
            }else{
                _genderView.image = [UIImage imageNamed:@"symbol_female"];
            }
            
            _nameLabel.text = rank.playerName;
            _scoreLabel.text = rank.score;
            
    }
    
}

- (void)updateRank:(VSRankingInfo *)rank
{
    switch (rank.currentRanking) {
        case 1:
        {
            _rankLabel.textColor = UIColorFromRGB(0xd73d3d);
            _rankLabel.text = @"1";
            break;
        }
        case 2:
        {
            _rankLabel.textColor = UIColorFromRGB(0xeb6100);
            _rankLabel.text = @"2";
            break;
        }
        case 3:
        {
            _rankLabel.textColor = UIColorFromRGB(0xf59563);
            _rankLabel.text = @"3";
            break;
        }
            
        default:
        {
            _rankLabel.textColor = UIColorFromRGB(0x343335);
            _rankLabel.text = [NSString stringWithFormat:@"%ld",(long)rank.currentRanking];
             break;
        }
    }
    
    if (rank.currentRanking<rank.oldRanking) {
        _rankTrendImageView.image = [UIImage imageNamed:@"triangle_red_down"];
        _varietyLabel.textColor = UIColorFromRGB(0xd73d3d);
        _varietyLabel.text = [NSString stringWithFormat:@"%ld",rank.oldRanking-rank.currentRanking];
    }else{
        _rankTrendImageView.image = [UIImage imageNamed:@"triangle_green_up"];
        _varietyLabel.textColor = UIColorFromRGB(0x4ca82b);
        _varietyLabel.text = [NSString stringWithFormat:@"%ld",rank.currentRanking-rank.oldRanking];
    }
    
  
}

@end
