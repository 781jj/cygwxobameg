//
//  VSImageView.m
//  GameBox
//
//  Created by YaoMing on 14-10-8.
//  Copyright (c) 2014年 cyggame. All rights reserved.
//

#import "VSImageView.h"
#import "UIImageView+WebCache.h"

@implementation VSImageView

- (void)reloadImage:(NSString *)urlPath default:(NSString *)path{
    self.image = [UIImage imageWithContentsOfFile:path];
    [self sd_setImageWithURL:[NSURL URLWithString:urlPath]];
}

- (void)reloadImage:(NSString *)urlPath{
    self.image = [UIImage imageNamed:@"head_default_big"];
    [self sd_setImageWithURL:[NSURL URLWithString:urlPath]];
}


@end
