//
//  VSRankTableViewCell.h
//  GameBox
//
//  Created by YaoMing on 14-10-7.
//  Copyright (c) 2014年 cyggame. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface VSRankTableViewCell : UITableViewCell
- (id)initWithReuseId:(NSString *)reuseId;
- (void)update:(NSInteger )index;
@end
