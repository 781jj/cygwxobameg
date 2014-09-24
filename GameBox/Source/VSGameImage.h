//
//  VSGameImage.h
//  GameBox
//
//  Created by YaoMing on 14-9-24.
//  Copyright (c) 2014年 cyggame. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface VSGameImage : NSObject

+ (VSGameImage *)shareInstance;


- (NSString *)iconPath:(NSString *)gameId;
- (NSArray *)galleryPath:(NSString *)gameId;

@end
