//
//  VSBroastTableViewCell.m
//  GameBox
//
//  Created by YaoMing on 14-10-5.
//  Copyright (c) 2014年 cyggame. All rights reserved.
//

#import "VSBroastTableViewCell.h"

@implementation VSBroastTableViewCell

- (id)initWithReuseId:(NSString *)reuseId 
{
    self = [super initWithStyle:UITableViewCellStyleDefault reuseIdentifier:reuseId];
    if (self) {
        self.selectionStyle = UITableViewCellSelectionStyleNone;

        UILabel *info = [[UILabel alloc] initWithFrame:self.bounds];
        info.text = @"广播位置";
        [self addSubview:info];
    }
    return self;
}

- (void)update
{
    
}

@end
