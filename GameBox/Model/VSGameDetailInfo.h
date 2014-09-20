//
//  VSGameDetailInfo.h
//  GameBox
//
//  Created by YaoMing on 14-9-20.
//  Copyright (c) 2014年 cyggame. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface VSGameDetailInfo : NSObject

@property (nonatomic,copy)NSString *name;
@property (nonatomic,copy)NSString *gameId;
@property (nonatomic,copy)NSString *picture;
@property (nonatomic,copy)NSString *abstract;
//玩法
@property (nonatomic,copy)NSString *gameplay;
@property (nonatomic,assign)NSInteger players;
@property (nonatomic,strong)NSArray *abstractImages;
@end
