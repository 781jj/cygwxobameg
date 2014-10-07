//
//  VSGameIntroduceView.m
//  GameBox
//
//  Created by YaoMing on 14-10-6.
//  Copyright (c) 2014年 cyggame. All rights reserved.
//

#import "VSGameIntroduceView.h"
#import "VSGameDetailInfo.h"
@interface VSGameIntroduceView ()
@property (nonatomic,weak)IBOutlet UIImageView *pic;
@property (nonatomic,weak)IBOutlet UILabel *nameLabel;
@property (nonatomic,weak)IBOutlet UILabel *abstractLabel;
@property (nonatomic,weak)IBOutlet UILabel *playsLabel;
@end
@implementation VSGameIntroduceView

- (void)reloadData:(VSGameDetailInfo *)gameInfo
{
    
    [_pic setImage:[UIImage imageWithContentsOfFile:gameInfo.iconPath]];
    _nameLabel.text = gameInfo.name;
    _abstractLabel.text = gameInfo.abstract;
    _playsLabel.text = [NSString stringWithFormat:@"%d",gameInfo.players];
}

@end
