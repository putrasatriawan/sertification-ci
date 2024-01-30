  <!--Header START-->
  <div class="app-header header-shadow">
      <div class="app-header__logo">
          <!-- <img class="<?php echo base_url(); ?>assets/images/logo.png"></img> -->
          <div class="logo-src"></div>
          <div class="header__pane ml-auto">
              <div>
                  <button type="button"
                          class="hamburger close-sidebar-btn hamburger--elastic"
                          data-class="closed-sidebar">
                      <span class="hamburger-box">
                          <span class="hamburger-inner"></span>
                      </span>
                  </button>
              </div>
          </div>
      </div>
      <div class="app-header__mobile-menu">
          <div>
              <button type="button"
                      class="hamburger hamburger--elastic mobile-toggle-nav">
                  <span class="hamburger-box">
                      <span class="hamburger-inner"></span>
                  </span>
              </button>
          </div>
      </div>
      <div class="app-header__menu">
          <span>
              <button type="button"
                      class="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav">
                  <span class="btn-icon-wrapper">
                      <i class="fa fa-ellipsis-v fa-w-6"></i>
                  </span>
              </button>
          </span>
      </div>
      <div class="app-header__content">
          <div class="app-header-left">
              <div class="search-wrapper">
                  <div class="input-holder">
                      <input type="text"
                             class="search-input"
                             placeholder="Type to search">
                      <button class="search-icon"><span></span></button>
                  </div>
                  <button class="close"></button>
              </div>
          </div>
         
          <div class="app-header-right">
              <div class="header-btn-lg pr-0">
                  <div class="widget-content p-0">
                      <div class="widget-content-wrapper">
                          <div class="widget-content-left">
                              <div class="btn-group">
                                  <a  id="notifDropdown"
                                  data-toggle="dropdown"
                                     aria-haspopup="true"
                                     aria-expanded="false"
                                     class="p-0 btn">
                                      <i class="fas fa-bell"></i>
                                      <i class="fa fa-angle-down ml-2 opacity-8"></i>
                                  </a>
                                  <div tabindex="-1"
                                       role="menu"
                                       aria-hidden="true"
                                       class="rm-pointers dropdown-menu-lg dropdown-menu dropdown-menu-right">
                                      <div class="dropdown-menu-header" >
                                          <div class="dropdown-menu-header-inner bg-info">
                                              <div class="menu-header-content text-left">
                                                  <div class="widget-content p-0">
                                                      <div class="widget-content-wrapper">
                                                          <div class="widget-content-left mr-3">
                                                              <p>Pemberitahuan</p>
                                                          </div>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                      <div class="scroll-area-xs"
                                           style="height: 500px;">
                                          <div class="scrollbar-container ps">
                                              <ul class="nav flex-column"
                                                  id="pengumuman">
                                               
                                              </ul>
                                          </div>
                                          
                                      </div>
                                      <div class="dropdown-menu-footer text-center">
                                      
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="header-btn-lg pr-0">
                  <div class="widget-content p-0">
                      <div class="widget-content-wrapper">
                          <div class="widget-content-left">
                              <div class="btn-group">
                                  <a  id="notifDropdown"
                                  data-toggle="dropdown"
                                     aria-haspopup="true"
                                     aria-expanded="false"
                                     class="p-0 btn">
                                      <img width="42"
                                           class="rounded-circle"
                                           src="<?php echo base_url('assets/images/avatars/default-user.png') ?>"
                                           alt="">
                                      <i class="fa fa-angle-down ml-2 opacity-8"></i>
                                  </a>
                                  <div tabindex="-1"
                                       role="menu"
                                       aria-hidden="true"
                                       class="rm-pointers dropdown-menu-lg dropdown-menu dropdown-menu-right">
                                      <div class="dropdown-menu-header">
                                          <div class="dropdown-menu-header-inner bg-info">
                                              <div class="menu-header-image opacity-2"
                                                   style="background-image: url('../assets/images/dropdown-header/city3.jpg');">
                                              </div>
                                              <div class="menu-header-content text-left">
                                                  <div class="widget-content p-0">
                                                      <div class="widget-content-wrapper">
                                                          <div class="widget-content-left mr-3">
                                                              <img width="42"
                                                                   class="rounded-circle"
                                                                   src="<?php echo base_url('assets/images/avatars/default-user.png') ?>"
                                                                   alt="">
                                                          </div>
                                                          <div class="widget-content-left">
                                                            
                                                          </div>
                                                         
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                      <div class="scroll-area-xs"
                                           style="height: 110px;">
                                          <div class="scrollbar-container ps">
                                              <ul class="nav flex-column">
                                                  <li class="nav-item-header nav-item">Activity </li>
                                                  <li class="nav-item">
                                                    
                                                         class="nav-link">Profile</a>
                                                  </li>
                                              </ul>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div class="widget-content-left  ml-3 header-user-info">

                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
  <!--Header END-->
