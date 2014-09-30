//
//  VSChannel.h
//  GameBox
//
//  Created by YaoMing on 14-9-20.
//  Copyright (c) 2014年 cyggame. All rights reserved.
//

#import <Foundation/Foundation.h>
typedef  enum {
    VSNewChannel = 1,
    VSHotChannel = 2,
}VSChannelType;

typedef  void(^VSChannelLoadDataBlock)(BOOL success,id );


@interface VSChannel : NSObject

@property (nonatomic,assign)VSChannelType type;
@property (nonatomic,strong)NSArray *gameList;
@property (nonatomic,strong)NSArray *favorList;
@property (nonatomic,copy)NSString *currentGameId;
- (id)initWithType:(VSChannelType )type;

- (void)loadData:(VSChannelLoadDataBlock)callback;
- (void)loadJson;
@end
