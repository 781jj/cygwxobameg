//
//  VSChannelSwitch.m
//  GameBox
//
//  Created by YaoMing on 14-9-20.
//  Copyright (c) 2014年 cyggame. All rights reserved.
//

#import "VSChannelSwitch.h"
#import "VSHomeController.h"
@interface VSChannelSwitch ()
{
    NSInteger _channelType; //默认0，hot
}

@property (nonatomic,weak)IBOutlet UIImageView *tapView;
@end

@implementation VSChannelSwitch


- (IBAction)hotClick:(id)sender
{
    if (_channelType == 0) {
        return;
    }
    
    _channelType = 0;
    _tapView.image = [UIImage  imageNamed:@"btn_Alternative_hot"];
   // [[VSHomeController shareInstance] channelClick:@"hot"];
}

- (IBAction)newClick:(id)sender
{
    if (_channelType == 1) {
        return;
    }
    
    _channelType = 1;
    _tapView.image = [UIImage  imageNamed:@"btn_Alternative_new"];
   // [[VSHomeController shareInstance] channelClick:@"new"];

}

- (void)moveToChannel:(NSInteger )index
{
    _channelType = index;
    if (_channelType) {
        _tapView.image = [UIImage  imageNamed:@"btn_Alternative_new"];
    }else{
        _tapView.image = [UIImage  imageNamed:@"btn_Alternative_hot"];
    }
}

/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect
{
    // Drawing code
}
*/

@end
